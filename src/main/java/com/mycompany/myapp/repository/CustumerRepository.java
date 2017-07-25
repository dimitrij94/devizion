package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Custumer;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Custumer entity.
 */
@SuppressWarnings("unused")
public interface CustumerRepository extends JpaRepository<Custumer,Long> {

}
