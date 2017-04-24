package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PortfolioEntry;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the PortfolioEntry entity.
 */
@SuppressWarnings("unused")
public interface PortfolioEntryRepository extends JpaRepository<PortfolioEntry,Long> {

}
