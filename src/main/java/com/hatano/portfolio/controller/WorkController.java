package com.hatano.portfolio.controller;

import com.hatano.portfolio.dto.WorkRequestDto;
import com.hatano.portfolio.dto.WorkResponseDto;
import com.hatano.portfolio.entity.Work;
import com.hatano.portfolio.repository.WorkRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/works")
public class WorkController {
    private final WorkRepository workRepository;

    public WorkController(WorkRepository workRepository) {
        this.workRepository = workRepository;
    }

    @GetMapping
    public List<Work> getAllWorks() {
        return workRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<?> createWork(@Valid @RequestBody WorkRequestDto dto, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Work saved = workRepository.save(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(new WorkResponseDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Work> updateWork(@PathVariable Long id, @RequestBody Work updatedWork) {
        return workRepository.findById(id)
                .map(work -> {
                    work.setTitle(updatedWork.getTitle());
                    work.setImageUrl(updatedWork.getImageUrl());
                    work.setDescription(updatedWork.getDescription());
                    work.setCreatedAt(updatedWork.getCreatedAt());
                    work.setLinkUrl(updatedWork.getLinkUrl());

                    Work saved = workRepository.save(work);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWork(@PathVariable Long id) {
        if (!workRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        workRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
