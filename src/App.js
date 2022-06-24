import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import "./styles.css";

class Animal {
  x = 10;
  y = 100;
  zIndex = 1;
  color = "red";
  timeout = null;
  energy = 100;
  moveListener = (e) => {
    if (this.energy > 0) {
      this.x += e.movementX;
      this.y += e.movementY;
      this.energy -= 1;
    }
  };

  constructor({ color = "red", size = "40px" } = {}) {
    this.color = color;
    this.width = size;
    this.height = size;

    makeAutoObservable(this);

    setInterval(() => {
      if (this.energy < 100) {
        this.energy += 0.1;
      }
    }, 100);
  }

  get style() {
    return {
      left: this.x,
      top: this.y,
      width: this.width,
      height: this.height,
      backgroundColor: this.color,
      zIndex: this.zIndex
    };
  }

  setPosition = (x, y) => {
    this.x = x;
    this.y = y;
  };

  onMouseDown = () => {
    this.zIndex = 100;
    window.addEventListener("mousemove", this.moveListener);
  };
  onMouseUp = () => {
    clearTimeout(this.timeout);
    window.removeEventListener("mousemove", this.moveListener);
    this.zIndex = 1;
  };
  onMouseLeave = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onMouseUp();
    }, 1000);
  };
}

const serik = new Animal({ color: "green" });
const syrym = new Animal({ color: "yellow", size: "50px" });
const zhans = new Animal({ color: "#af45ef", size: "200px" });

syrym.setPosition(200, 200);
zhans.setPosition(250, 300);

const animals = [serik, syrym, zhans];

console.log(syrym.__proto__);

const App = observer(() => {
  return (
    <div className="App">
      {animals.map((animal) => (
        <div
          className="element"
          onMouseDown={animal.onMouseDown}
          onMouseUp={animal.onMouseUp}
          onMouseLeave={animal.onMouseUp}
          style={animal.style}
        >
          <div className="energy-bar">
            <div
              className="energy-level"
              style={{ width: animal.energy + "%" }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default App;
