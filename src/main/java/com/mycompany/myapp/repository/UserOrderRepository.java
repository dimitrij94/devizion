package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserOrder;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserOrder entity.
 */
@SuppressWarnings("unused")
public interface UserOrderRepository extends JpaRepository<UserOrder,Long> {

}
