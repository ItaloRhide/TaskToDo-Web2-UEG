package com.br.tasktodo.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
@Validated
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    // 1. LISTAR - Buscar todas as tarefas
    @GetMapping
    public ResponseEntity<List<Task>> listarTodasTarefas() {
        try {
            List<Task> tasks = taskService.listarTodasTarefas();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 2. CONSULTAR - Buscar tarefa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> buscarTarefaPorId(@PathVariable Long id) {
        try {
            Task task = taskService.buscarTarefaPorId(id);
            return ResponseEntity.ok(task);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // 3. INCLUIR - Criar nova tarefa
    @PostMapping
    public ResponseEntity<?> criarTarefa(@Valid @RequestBody Task task) {
        try {
            Task novaTarefa = taskService.criarTarefa(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(novaTarefa);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erro interno do servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // 4. ALTERAR - Atualizar tarefa existente
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarTarefa(@PathVariable Long id, @Valid @RequestBody Task task) {
        try {
            Task tarefaAtualizada = taskService.atualizarTarefa(id, task);
            return ResponseEntity.ok(tarefaAtualizada);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erro interno do servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // 5. EXCLUIR - Deletar tarefa
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirTarefa(@PathVariable Long id) {
        try {
            taskService.excluirTarefa(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Tarefa excluída com sucesso");
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erro interno do servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Endpoints adicionais para funcionalidades específicas
    
    // Marcar tarefa como concluída
    @PutMapping("/{id}/concluir")
    public ResponseEntity<?> marcarComoConcluida(@PathVariable Long id) {
        try {
            Task task = taskService.marcarComoConcluida(id);
            return ResponseEntity.ok(task);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erro interno do servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Buscar tarefas por status
    @GetMapping("/status/{concluida}")
    public ResponseEntity<List<Task>> buscarTarefasPorStatus(@PathVariable Boolean concluida) {
        try {
            List<Task> tasks = taskService.buscarTarefasPorStatus(concluida);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar tarefas por prioridade
    @GetMapping("/prioridade/{prioridade}")
    public ResponseEntity<?> buscarTarefasPorPrioridade(@PathVariable Integer prioridade) {
        try {
            List<Task> tasks = taskService.buscarTarefasPorPrioridade(prioridade);
            return ResponseEntity.ok(tasks);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar tarefas por título
    @GetMapping("/buscar")
    public ResponseEntity<List<Task>> buscarTarefasPorTitulo(@RequestParam String titulo) {
        try {
            List<Task> tasks = taskService.buscarTarefasPorTitulo(titulo);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar tarefas que vencem hoje
    @GetMapping("/vencimento/hoje")
    public ResponseEntity<List<Task>> buscarTarefasQueVencemHoje() {
        try {
            List<Task> tasks = taskService.buscarTarefasQueVencemHoje();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar tarefas vencidas
    @GetMapping("/vencidas")
    public ResponseEntity<List<Task>> buscarTarefasVencidas() {
        try {
            List<Task> tasks = taskService.buscarTarefasVencidas();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar tarefas pendentes ordenadas por prioridade
    @GetMapping("/pendentes")
    public ResponseEntity<List<Task>> buscarTarefasPendentesOrdenadas() {
        try {
            List<Task> tasks = taskService.buscarTarefasPendentesOrdenadas();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar tarefas por período
    @GetMapping("/periodo")
    public ResponseEntity<?> buscarTarefasPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataFim) {
        try {
            List<Task> tasks = taskService.buscarTarefasPorPeriodo(dataInicio, dataFim);
            return ResponseEntity.ok(tasks);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

