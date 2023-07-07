const hexRgb = (hex: string) => {
    // Удалить символ # из начала строки HEX (если присутствует)
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }
  
    // Проверить длину строки HEX и разделить на отдельные компоненты
    let r: string;
    let g: string;
    let b: string;
  
    if (hex.length === 3) {
      r = hex[0] + hex[0];
      g = hex[1] + hex[1];
      b = hex[2] + hex[2];
    } else if (hex.length === 6) {
      r = hex.slice(0, 2);
      g = hex.slice(2, 4);
      b = hex.slice(4, 6);
    } else {
      throw new Error("Недопустимый формат строки HEX.");
    }
  
    // Преобразовать компоненты HEX в числа
    const red = parseInt(r, 16);
    const green = parseInt(g, 16);
    const blue = parseInt(b, 16);

    return {
        red,
        green,
        blue
    };
  }

const d2h = (d: number) => {
    
    return d.toString(16)
    
};

const h2d = (h: string) => {
    
    let value = parseInt(h, 16);

    if(value > 255) value = 255;
    if(value < 0) value = 0;

    return value;
    
}

export const mixColors = function(color1: string, color2: string, weight: number = 50): string {
  
    color1 = color1.replaceAll('#', '');
    color2 = color2.replaceAll('#', '');

    let color = "#";
  
    for(var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
        let v1 = h2d(color1.substring(i, i + 2)); // extract the current pairs
        let v2 = h2d(color2.substring(i, i + 2));
          
        // combine the current pairs from each source color, according to the specified weight
        let v = Math.floor(v2 + (v1 - v2) * (weight / 100.0));

        if(v > 255) v = 255;
        if(v < 0) v = 0;

        let val = d2h(v); 
  
        while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit
      
        color += val; // concatenate val to our new color string


    }

      
    return color;

};

export const hex2rgb = (hex: string) => {

    const { red, green, blue } = hexRgb(hex);

    return `${red}, ${green}, ${blue}`;

}

export const isHex = (value: string) => {

    let re = /[0-9A-Fa-f]{6}/g;

    return re.test(value);

}


export const calculateWeightDifference = function(color1: string, color2: string, generatedColor: string): number {
    
    color1 = color1.replace('#', '');
    color2 = color2.replace('#', '');
    generatedColor = generatedColor.replace('#', '');

    let weightDifference = 0;

    for (let i = 0; i <= 5; i += 2) {
        let v1 = h2d(color1.substring(i, i + 2));
        let v2 = h2d(color2.substring(i, i + 2));
        let vg = h2d(generatedColor.substring(i, i + 2));

        if (v1 !== v2) {
            weightDifference = ((vg - v2) / (v1 - v2)) * 100;
            break;
        }
    }

    return weightDifference;
};