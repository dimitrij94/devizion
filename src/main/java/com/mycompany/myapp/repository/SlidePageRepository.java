package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SlidePage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the SlidePage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlidePageRepository extends JpaRepository<SlidePage,Long> {

}
