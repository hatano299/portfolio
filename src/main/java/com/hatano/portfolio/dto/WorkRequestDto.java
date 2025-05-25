package com.hatano.portfolio.dto;

import com.hatano.portfolio.entity.Work;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WorkRequestDto {
    @NotBlank
    private String title;

    // TODO: urlパターンのバリデーション追加
    @NotBlank
    private String imageUrl;

    private String description;

    @NotNull
    private LocalDate createdAt;

    // TODO: urlパターンのバリデーション追加
    @NotBlank
    private String linkUrl;

    public Work toEntity() {
        return Work.builder()
                .title(this.title)
                .imageUrl(this.imageUrl)
                .description(this.description)
                .createdAt(this.createdAt)
                .linkUrl(this.linkUrl)
                .build();
    }
}
