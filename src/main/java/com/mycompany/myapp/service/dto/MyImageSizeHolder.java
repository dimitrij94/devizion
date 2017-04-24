package com.mycompany.myapp.service.dto;

/**
 * Created by Dmitrij on 23.04.2017.
 */

public class MyImageSizeHolder {
    private static double[] scalars = {0.2, 0.4,0.6, 0.8, 1.0};

    private int originalWidth;
    private int originalHeight;

    private int[] widths;
    private int[] heights;

    public static int NUM_SCALARS = scalars.length;

    public MyImageSizeHolder(int originalWidth, int originalHeight) {
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;

        this.widths = scaleValue(originalWidth);
        this.heights = scaleValue(originalHeight);
    }



    private int[] scaleValue(int value) {
        int[] returnValue = new int[scalars.length];
        for (int i = 0; i < scalars.length; i++) {
            returnValue[i] = new Double(value * scalars[i]).intValue();
        }
        return returnValue;
    }

    public void setOriginalWidth(int originalWidth) {
        this.originalWidth = originalWidth;
        this.widths = scaleValue(originalWidth);
    }

    public void setOriginalHeight(int originalHeight) {
        this.originalHeight = originalHeight;
        this.heights = scaleValue(originalHeight);
    }

    public static double[] getScalars() {
        return scalars;
    }

    public int getOriginalWidth() {
        return originalWidth;
    }

    public int getOriginalHeight() {
        return originalHeight;
    }

    public int[] getWidths() {
        return widths;
    }

    public int[] getHeights() {
        return heights;
    }
}
