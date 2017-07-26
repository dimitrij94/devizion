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

    @Column(name = "photo_uri")
    private String photoUri;

    @Column(name = "croped_uri")
    private String cropedUri;

    @Column(name = "description")
    private String description;

    @Column(name = "ordered_at")
    private LocalDate orderedAt;

    @ManyToOne
    private Custumer custumer;

    @ManyToOne
    private Product product;

    @Column(name = "cropp_coordinate_X_1")
    private float croppCoordinateX1;

    @Column(name = "cropp_coordinate_X_2")
    private float croppCoordinateX2;

    @Column(name = "cropp_coordinate_Y_1")
    private float croppCoordinateY1;

    @Column(name = "cropp_coordinate_Y_2")
    private float croppCoordinateY2;


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

    public String getCropedUri() {
        return cropedUri;
    }

    public UserOrder cropedUri(String cropedUri) {
        this.cropedUri = cropedUri;
        return this;
    }

    public void setCropedUri(String cropedUri) {
        this.cropedUri = cropedUri;
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

    public Product getProduct() {
        return product;
    }

    public UserOrder product(Product product) {
        this.product = product;
        return this;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public float getCroppCoordinateX1() {
        return croppCoordinateX1;
    }

    public void setCroppCoordinateX1(float croppCoordinateX1) {
        this.croppCoordinateX1 = croppCoordinateX1;
    }

    public float getCroppCoordinateX2() {
        return croppCoordinateX2;
    }

    public void setCroppCoordinateX2(float croppCoordinateX2) {
        this.croppCoordinateX2 = croppCoordinateX2;
    }

    public float getCroppCoordinateY1() {
        return croppCoordinateY1;
    }

    public void setCroppCoordinateY1(float croppCoordinateY1) {
        this.croppCoordinateY1 = croppCoordinateY1;
    }

    public float getCroppCoordinateY2() {
        return croppCoordinateY2;
    }

    public void setCroppCoordinateY2(float croppCoordinateY2) {
        this.croppCoordinateY2 = croppCoordinateY2;
    }


    public void setProduct(Product product) {
        this.product = product;
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
            ", cropedUri='" + cropedUri + "'" +
            ", description='" + description + "'" +
            ", orderedAt='" + orderedAt + "'" +
            '}';
    }
}
