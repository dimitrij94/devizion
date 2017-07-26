package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ImageToken;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the ImageToken entity.
 */
@SuppressWarnings("unused")
public interface ImageTokenRepository extends JpaRepository<ImageToken,Long> {

}
