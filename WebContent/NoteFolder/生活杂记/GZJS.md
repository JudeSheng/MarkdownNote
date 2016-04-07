    private static void shAfter( double before, double bt) {
        double rateArray[] = {0.08,0.02,0.07,0.21,0.11,0.07};
        double max = 16352;
        double sbArray[] = new double[rateArray.length];
        double sbjs = before <= max ? before : max;
        for (int i = 0; i < rateArray.length; i++) {
            sbArray[i] = rateArray[i]*sbjs;
        }
        
        double taxable = before + bt - sbArray[0] - sbArray[1] - sbArray[2];
        double taxArray[] = {3500,5000,8000,12500,38500};
        double taxRateArray[] = {0,0.03,0.1,0.2,0.25};
        double tax = 0;
        for (int i = 0; i < taxArray.length; i++) {
            double taxjsChild = 0;
            double taxMax = 0;
            if(taxable > taxArray[i]) {
                taxjsChild = taxArray[i];
            } else if(taxable <= taxArray[i]) {
                taxjsChild = taxable;
            }
            if(i != 0) {
                taxMax = taxArray[i - 1];
                if(taxjsChild <= taxMax) {
                    break;
                }
            }
            tax += (taxjsChild - taxMax)*taxRateArray[i];
        }
        double after = taxable - tax;
        
        System.out.println( "(" + (before + bt)*12/10000 + ")" + (before + bt) + " - " + (sbArray[0] + sbArray[1] + sbArray[2]) + " - " + tax + " = " + after + "(" + after*12/10000 + ")");
        System.out.println(after + " + " + (sbArray[2] + sbArray[5])  + " = " + (after + sbArray[2] + sbArray[5]) + "(" + (after + sbArray[2] + sbArray[5])*12/10000 + ")");
        System.out.println((sbArray[0] + sbArray[3]) + "+" + (sbArray[1] + sbArray[4]));
    }