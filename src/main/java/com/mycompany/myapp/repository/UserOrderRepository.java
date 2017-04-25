package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserOrder;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserOrder entity.
 */
@SuppressWarnings("unused")
public interface UserOrderRepository extends JpaRepository<UserOrder,Long> {

    Page<UserOrder> findAllByOrderedProductId(Pageable pageable, Long productId);
}
