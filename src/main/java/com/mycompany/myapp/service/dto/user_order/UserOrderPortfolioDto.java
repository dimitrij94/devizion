package com.mycompany.myapp.service.dto.user_order;

import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.domain.UserOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Dmitrij on 25.04.2017.
 */
public class UserOrderPortfolioDto {

    private Long id;
    private String photoUri;
    private String description;
    private Product orderedProduct;

    public UserOrderPortfolioDto() {
    }

    public static UserOrderPortfolioDto getPortfolioFromUserOrder(UserOrder userOrder) {
        UserOrderPortfolioDto portfolioDto = new UserOrderPortfolioDto();
        portfolioDto.id = userOrder.getId();
        portfolioDto.description = userOrder.getDescription();
        portfolioDto.orderedProduct = userOrder.getOrderedProduct();
        return portfolioDto;
    }

    public static Page<UserOrderPortfolioDto> convertPage(Pageable pageable, Page<UserOrder> oldPage){
        List<UserOrderPortfolioDto> portfolioDtos = oldPage.getContent()
            .stream()
            .map(UserOrderPortfolioDto::getPortfolioFromUserOrder)
            .collect(Collectors.toList());
        return new PageImpl<>(portfolioDtos, pageable, oldPage.getTotalElements());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoUri() {
        return photoUri;
    }

    public void setPhotoUri(String photoUri) {
        this.photoUri = photoUri;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Product getOrderedProduct() {
        return orderedProduct;
    }

    public void setOrderedProduct(Product orderedProduct) {
        this.orderedProduct = orderedProduct;
    }
}
