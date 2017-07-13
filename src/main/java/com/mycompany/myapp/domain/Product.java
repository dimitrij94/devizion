package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "product_name", nullable = false)
    private String productName;

    @NotNull
    @Column(name = "product_price", nullable = false)
    private Float productPrice;

    @NotNull
    @Column(name = "product_description", columnDefinition = "TEXT", nullable = false)
    private String productDescription;

    @Column(name = "product_image_uri")
    private String productImageUri;

    @Column(name = "cropped_image_uri")
    private String croppedImageUri;

    @Column(name = "product_self_cost")
    private Float productSelfCost;

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserOrder> orderedProducts = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private ProductCategory productCategory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public Product productName(String productName) {
        this.productName = productName;
        return this;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Float getProductPrice() {
        return productPrice;
    }

    public Product productPrice(Float productPrice) {
        this.productPrice = productPrice;
        return this;
    }

    public void setProductPrice(Float productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public Product productDescription(String productDescription) {
        this.productDescription = productDescription;
        return this;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductImageUri() {
        return productImageUri;
    }

    public Product productImageUri(String productImageUri) {
        this.productImageUri = productImageUri;
        return this;
    }

    public void setProductImageUri(String productImageUri) {
        this.productImageUri = productImageUri;
    }

    public Float getProductSelfCost() {
        return productSelfCost;
    }

    public Product productSelfCost(Float productSelfCost) {
        this.productSelfCost = productSelfCost;
        return this;
    }

    public void setProductSelfCost(Float productSelfCost) {
        this.productSelfCost = productSelfCost;
    }

    public Set<UserOrder> getOrderedProducts() {
        return orderedProducts;
    }

    public Product orderedProducts(Set<UserOrder> userOrders) {
        this.orderedProducts = userOrders;
        return this;
    }

    public Product addOrderedProduct(UserOrder userOrder) {
        this.orderedProducts.add(userOrder);
        userOrder.setProduct(this);
        return this;
    }

    public Product removeOrderedProduct(UserOrder userOrder) {
        this.orderedProducts.remove(userOrder);
        userOrder.setProduct(null);
        return this;
    }

    public void setOrderedProducts(Set<UserOrder> userOrders) {
        this.orderedProducts = userOrders;
    }

    public ProductCategory getProductCategory() {
        return productCategory;
    }

    public Product productCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
        return this;
    }

    public void setProductCategory(ProductCategory productCategory) {
        this.productCategory = productCategory;
    }

    public String getCroppedImageUri() {
        return croppedImageUri;
    }

    public void setCroppedImageUri(String croppedImageUri) {
        this.croppedImageUri = croppedImageUri;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if (product.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + id +
            ", productName='" + productName + "'" +
            ", productPrice='" + productPrice + "'" +
            ", productDescription='" + productDescription + "'" +
            ", productImageUri='" + productImageUri + "'" +
            ", productSelfCost='" + productSelfCost + "'" +
            '}';
    }
}
