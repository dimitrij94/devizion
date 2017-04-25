package com.mycompany.myapp.domain;

import com.mycompany.myapp.service.dto.user_order.UserOrderDtoViews;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonView;

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
    @JsonView(UserOrderDtoViews.SharedView.class)
    private Long id;

    @Column(name = "photo_uri")
    @JsonView(UserOrderDtoViews.SharedView.class)
    private String photoUri;

    @Column(name = "description")
    @JsonView(UserOrderDtoViews.SharedView.class)
    private String description;

    @Column(name = "order_notes")
    private String orderNotes;

    @Column(name = "ordered_at")
    private LocalDate orderedAt;

    @ManyToOne
    @JsonView(UserOrderDtoViews.PortfolioViewDto.class)
    private Product orderedProduct;

    @ManyToOne
    private Custumer custumer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoUri() {
        return photoUri;
    }

    public UserOrder photoUri(String photoUri) {
        this.photoUri = photoUri;
        return this;
    }

    public void setPhotoUri(String photoUri) {
        this.photoUri = photoUri;
    }

    public String getDescription() {
        return description;
    }

    public UserOrder description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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
            ", photoUri='" + photoUri + "'" +
            ", description='" + description + "'" +
            ", orderNotes='" + orderNotes + "'" +
            ", orderedAt='" + orderedAt + "'" +
            '}';
    }
}
