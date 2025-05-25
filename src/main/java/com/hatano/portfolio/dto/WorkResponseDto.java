package com.hatano.portfolio.dto;

import com.hatano.portfolio.entity.Work;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WorkResponseDto {
    private Long id;
    private String title;
    private String imageUrl;
    private String description;
    private LocalDate createdAt;
    private String linkUrl;

    public WorkResponseDto(Work work) {
        this.id = work.getId();
        this.title = work.getTitle();
        this.imageUrl = work.getImageUrl();
        this.description = work.getDescription();
        this.createdAt = work.getCreatedAt();
        this.linkUrl = work.getLinkUrl();
    }
}
