package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SlidePage;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SlidePage entity.
 */
@SuppressWarnings("unused")
public interface SlidePageRepository extends JpaRepository<SlidePage,Long> {

}
