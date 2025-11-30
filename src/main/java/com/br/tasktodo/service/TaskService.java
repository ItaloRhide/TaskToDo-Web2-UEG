package com.br.tasktodo.service;

import com.br.tasktodo.dto.CategoryDTO;
import com.br.tasktodo.dto.TaskDTO;
import com.br.tasktodo.exception.ResourceNotFoundException;
import com.br.tasktodo.model.Category;
import com.br.tasktodo.model.Task;
import com.br.tasktodo.repository.CategoryRepository;
import com.br.tasktodo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<TaskDTO> listarTodasTarefas() {
        return taskRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TaskDTO buscarTarefaPorId(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));
        return toDTO(task);
    }
    
    @Transactional
    public TaskDTO criarTarefa(Task task) {
        if (task.getDataVencimento().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Data de vencimento não pode ser anterior à data atual");
        }
        if (task.getPrioridade() < 1 || task.getPrioridade() > 5) {
            throw new IllegalArgumentException("Prioridade deve estar entre 1 (baixa) e 5 (alta)");
        }
        
        // Garante que a entidade Categoria seja gerenciada pelo JPA
        if (task.getCategoria() != null && task.getCategoria().getId() != null) {
            Category category = categoryRepository.findById(task.getCategoria().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com ID: " + task.getCategoria().getId()));
            task.setCategoria(category);
        } else {
            throw new IllegalArgumentException("Categoria é obrigatória para criar uma tarefa.");
        }

        task.setDataCriacao(LocalDateTime.now());
        task.setConcluida(false);
        
        Task savedTask = taskRepository.save(task);
        return toDTO(savedTask);
    }
    
    @Transactional
    public TaskDTO atualizarTarefa(Long id, Task taskAtualizada) {
        Task taskExistente = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));

        if (taskAtualizada.getDataVencimento().isBefore(LocalDate.now()) && !taskAtualizada.getConcluida()) {
            throw new IllegalArgumentException("Data de vencimento não pode ser anterior à data atual para tarefas não concluídas");
        }
        if (taskAtualizada.getPrioridade() < 1 || taskAtualizada.getPrioridade() > 5) {
            throw new IllegalArgumentException("Prioridade deve estar entre 1 (baixa) e 5 (alta)");
        }

        // Garante que a entidade Categoria seja gerenciada pelo JPA
        if (taskAtualizada.getCategoria() != null && taskAtualizada.getCategoria().getId() != null) {
             Category category = categoryRepository.findById(taskAtualizada.getCategoria().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada com ID: " + taskAtualizada.getCategoria().getId()));
            taskExistente.setCategoria(category);
        } else {
             throw new IllegalArgumentException("Categoria é obrigatória para atualizar uma tarefa.");
        }

        taskExistente.setTitulo(taskAtualizada.getTitulo());
        taskExistente.setDescricao(taskAtualizada.getDescricao());
        taskExistente.setDataVencimento(taskAtualizada.getDataVencimento());
        taskExistente.setPrioridade(taskAtualizada.getPrioridade());
        taskExistente.setConcluida(taskAtualizada.getConcluida());
        taskExistente.setDataAtualizacao(LocalDateTime.now());
        
        Task updatedTask = taskRepository.save(taskExistente);
        return toDTO(updatedTask);
    }
    
    @Transactional
    public void excluirTarefa(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tarefa não encontrada com ID: " + id);
        }
        taskRepository.deleteById(id);
    }
    
    @Transactional
    public TaskDTO marcarComoConcluida(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));
        task.setConcluida(true);
        task.setDataAtualizacao(LocalDateTime.now());
        Task updatedTask = taskRepository.save(task);
        return toDTO(updatedTask);
    }
    
    @Transactional(readOnly = true)
    public List<TaskDTO> buscarPorCategoria(Long categoryId) {
        return taskRepository.findByCategoriaId(categoryId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Métodos de mapeamento
    private TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitulo(task.getTitulo());
        dto.setDescricao(task.getDescricao());
        dto.setDataVencimento(task.getDataVencimento());
        dto.setConcluida(task.getConcluida());
        dto.setPrioridade(task.getPrioridade());
        dto.setDataCriacao(task.getDataCriacao());
        dto.setDataAtualizacao(task.getDataAtualizacao());
        if (task.getCategoria() != null) {
            CategoryDTO catDto = new CategoryDTO();
            catDto.setId(task.getCategoria().getId());
            catDto.setNome(task.getCategoria().getNome());
            catDto.setDescricao(task.getCategoria().getDescricao());
            dto.setCategoria(catDto);
        }
        return dto;
    }
}

