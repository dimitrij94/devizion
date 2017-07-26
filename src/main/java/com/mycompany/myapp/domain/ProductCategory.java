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
 * A ProductCategory.
 */
@Entity
@Table(name = "product_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ProductCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @Column(name = "category_photo_uri")
    private String categoryPhotoUri;

    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.REMOVE)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> categoryProducts = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public ProductCategory categoryName(String categoryName) {
        this.categoryName = categoryName;
        return this;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryPhotoUri() {
        return categoryPhotoUri;
    }

    public ProductCategory categoryPhotoUri(String categoryPhotoUri) {
        this.categoryPhotoUri = categoryPhotoUri;
        return this;
    }

    public void setCategoryPhotoUri(String categoryPhotoUri) {
        this.categoryPhotoUri = categoryPhotoUri;
    }

    public Set<Product> getCategoryProducts() {
        return categoryProducts;
    }

    public ProductCategory categoryProducts(Set<Product> products) {
        this.categoryProducts = products;
        return this;
    }

    public ProductCategory addCategoryProducts(Product product) {
        this.categoryProducts.add(product);
        product.setProductCategory(this);
        return this;
    }

    public ProductCategory removeCategoryProducts(Product product) {
        this.categoryProducts.remove(product);
        product.setProductCategory(null);
        return this;
    }

    public void setCategoryProducts(Set<Product> products) {
        this.categoryProducts = products;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductCategory productCategory = (ProductCategory) o;
        if (productCategory.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, productCategory.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "ProductCategory{" +
            "id=" + id +
            ", categoryName='" + categoryName + "'" +
            ", categoryPhotoUri='" + categoryPhotoUri + "'" +
            '}';
    }
}
