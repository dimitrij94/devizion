package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A UserOrder.
 */
@Entity
@Table(name = "user_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_notes")
    private String orderNotes;

    @Column(name = "ordered_at")
    private LocalDate orderedAt;

    @ManyToOne
    private Product orderedProduct;

    @ManyToOne
    private Custumer custumer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNotes() {
        return orderNotes;
    }

    public UserOrder orderNotes(String orderNotes) {
        this.orderNotes = orderNotes;
        return this;
    }

    public void setOrderNotes(String orderNotes) {
        this.orderNotes = orderNotes;
    }

    public LocalDate getOrderedAt() {
        return orderedAt;
    }

    public UserOrder orderedAt(LocalDate orderedAt) {
        this.orderedAt = orderedAt;
        return this;
    }

    public void setOrderedAt(LocalDate orderedAt) {
        this.orderedAt = orderedAt;
    }

    public Product getOrderedProduct() {
        return orderedProduct;
    }

    public UserOrder orderedProduct(Product product) {
        this.orderedProduct = product;
        return this;
    }

    public void setOrderedProduct(Product product) {
        this.orderedProduct = product;
    }

    public Custumer getCustumer() {
        return custumer;
    }

    public UserOrder custumer(Custumer custumer) {
        this.custumer = custumer;
        return this;
    }

    public void setCustumer(Custumer custumer) {
        this.custumer = custumer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserOrder userOrder = (UserOrder) o;
        if (userOrder.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, userOrder.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "UserOrder{" +
            "id=" + id +
            ", orderNotes='" + orderNotes + "'" +
            ", orderedAt='" + orderedAt + "'" +
            '}';
    }
}
