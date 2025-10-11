package com.br.tasktodo.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.repository.TaskRepository;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    // Listar todas as tarefas
    public List<Task> listarTodasTarefas() {
        return taskRepository.findAll();
    }
    
    // Buscar tarefa por ID
    public Task buscarTarefaPorId(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if (task.isPresent()) {
            return task.get();
        } else {
            throw new ResourceNotFoundException("Tarefa não encontrada com ID: " + id);
        }
    }
    
    // Criar nova tarefa
    public Task criarTarefa(Task task) {
        // Validações de negócio
        if (task.getDataVencimento().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Data de vencimento não pode ser anterior à data atual");
        }
        
        if (task.getPrioridade() < 1 || task.getPrioridade() > 5) {
            throw new IllegalArgumentException("Prioridade deve estar entre 1 (baixa) e 5 (alta)");
        }
        
        task.setDataCriacao(LocalDateTime.now());
        task.setConcluida(false);
        
        return taskRepository.save(task);
    }
    
    // Atualizar tarefa existente
    public Task atualizarTarefa(Long id, Task taskAtualizada) {
        Task taskExistente = buscarTarefaPorId(id);
        
        // Validações de negócio
        if (taskAtualizada.getDataVencimento().isBefore(LocalDate.now()) && !taskAtualizada.getConcluida()) {
            throw new IllegalArgumentException("Data de vencimento não pode ser anterior à data atual para tarefas não concluídas");
        }
        
        if (taskAtualizada.getPrioridade() < 1 || taskAtualizada.getPrioridade() > 5) {
            throw new IllegalArgumentException("Prioridade deve estar entre 1 (baixa) e 5 (alta)");
        }
        
        // Atualizar campos
        taskExistente.setTitulo(taskAtualizada.getTitulo());
        taskExistente.setDescricao(taskAtualizada.getDescricao());
        taskExistente.setDataVencimento(taskAtualizada.getDataVencimento());
        taskExistente.setPrioridade(taskAtualizada.getPrioridade());
        taskExistente.setConcluida(taskAtualizada.getConcluida());
        taskExistente.setDataAtualizacao(LocalDateTime.now());
        
        return taskRepository.save(taskExistente);
    }
    
    // Excluir tarefa
    public void excluirTarefa(Long id) {
        Task task = buscarTarefaPorId(id);
        taskRepository.delete(task);
    }
    
    // Marcar tarefa como concluída
    public Task marcarComoConcluida(Long id) {
        Task task = buscarTarefaPorId(id);
        task.setConcluida(true);
        task.setDataAtualizacao(LocalDateTime.now());
        return taskRepository.save(task);
    }
    
    // Buscar tarefas por status
    public List<Task> buscarTarefasPorStatus(Boolean concluida) {
        return taskRepository.findByConcluida(concluida);
    }
    
    // Buscar tarefas por prioridade
    public List<Task> buscarTarefasPorPrioridade(Integer prioridade) {
        if (prioridade < 1 || prioridade > 5) {
            throw new IllegalArgumentException("Prioridade deve estar entre 1 e 5");
        }
        return taskRepository.findByPrioridade(prioridade);
    }
    
    // Buscar tarefas por título
    public List<Task> buscarTarefasPorTitulo(String titulo) {
        return taskRepository.findByTituloContainingIgnoreCase(titulo);
    }
    
    // Buscar tarefas que vencem hoje
    public List<Task> buscarTarefasQueVencemHoje() {
        return taskRepository.findByDataVencimento(LocalDate.now());
    }
    
    // Buscar tarefas vencidas
    public List<Task> buscarTarefasVencidas() {
        return taskRepository.findByDataVencimentoLessThanEqual(LocalDate.now().minusDays(1));
    }
    
    // Buscar tarefas pendentes ordenadas por prioridade
    public List<Task> buscarTarefasPendentesOrdenadas() {
        return taskRepository.findTasksPendentesOrderByPrioridadeAndDataVencimento();
    }
    
    // Buscar tarefas por período
    public List<Task> buscarTarefasPorPeriodo(LocalDate dataInicio, LocalDate dataFim) {
        if (dataInicio.isAfter(dataFim)) {
            throw new IllegalArgumentException("Data de início não pode ser posterior à data de fim");
        }
        return taskRepository.findTasksByPeriodoVencimento(dataInicio, dataFim);
    }
}

