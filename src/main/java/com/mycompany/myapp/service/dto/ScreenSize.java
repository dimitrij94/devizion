package com.mycompany.myapp.service.dto;

/**
 * Created by Dmitrij on 23.04.2017.
 */
public enum ScreenSize {
    xs(0, 599),
    sm(600, 959),
    md(960, 1279),
    lg(1280, 1919);

    private int minWidth;
    private int maxWidth;

    ScreenSize(int minWidth, int maxWidth) {
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
    }

    public int getMinWidth() {
        return minWidth;
    }

    public int getMaxWidth() {
        return maxWidth;
    }


}
