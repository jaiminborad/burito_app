const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    BURRITOS: Symbol("burritos"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    TACOS: Symbol("tacos"),
    DRINKS:  Symbol("drinks")
});

module.exports = class BurritoOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sTacos = "",
        this.sDrinks = "";
        this.sItem = "burrito";
        this.sItem2 = "tacos";
    }
    Cost() {
        var cost = 0;
        if (this.sItem.trim().toLowerCase === "bean") {
            cost += 2;
        } else {
            cost += 1.5;
        }
        if (this.sSize.trim().toLowerCase === "large") {
            cost += 2;
        } else {
            cost += 1.5;
        }
        if (this.sTacos.trim().toLowerCase === "cheesy") {
            cost += 4;
        } else {
            cost += 2;
        }
        if (this.sDrinks) {
            cost += 1.5;
        }
        cost *= 1.1;
        return cost.toFixed(2);
        
    }

    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.BURRITOS;
                aReturn.push("Welcome to Jaimin's Burrito.Please select one bean or soy ?");
                break;
            case OrderState.BURRITOS:
                this.sBurritos = sInput;
                this.stateCur = OrderState.SIZE;
                aReturn.push("What size would you like? Large or small ?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS;
                this.sSize = sInput;
                aReturn.push("What Toppings would you like ?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.TACOS;
                this.sToppings = sInput;
                aReturn.push("What tacos would you like ? Regular or Cheesy");
                break;
            case OrderState.TACOS:
                this.stateCur = OrderState.DRINKS;
                this.sTacos = sInput;
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem}, ${this.sTacos} ${this.sItem2} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Estimated cost is $ ${this.Cost()} including taxes`);
                aReturn.push(`Please pick up your order at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}