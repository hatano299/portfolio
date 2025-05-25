package com.hatano.portfolio.repository;

import com.hatano.portfolio.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findAllByOrderByCreatedAtDesc();
}
