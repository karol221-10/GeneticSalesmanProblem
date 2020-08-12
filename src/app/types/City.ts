export class City {
  private static _idsequence = 1;
  private _id: number;
  private _x: number;
  private _y: number;


  get id(): number {
    return this._id;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  constructor(x?: number, y?: number) {
    this._x = x;
    this._y = y;
    this._id = City._idsequence;
    City._idsequence++;
  }


  public getDistance(otherCity: City): number {
    const xDistance = otherCity.x - this.x;
    const yDistance = otherCity.y - this.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
}
