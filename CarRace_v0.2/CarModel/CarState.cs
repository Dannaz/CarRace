using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarModel
{
	//Класс описывающий состояние автомобиля
	public class CarState
	{
		//Позиция
		public Position position;
		//Состояние, допустимые значениия: stopLights, leftLights, rightLights, idle
		public string state;
		//Скорость, допустимые значениия: 0, 1, 2
		public int velosity;
		//Направление, допустимые значениия: north, west, south, east
		public string dirrection;


		public CarState(Position startPosition, string lgt, int vel, string startDirrection)
		{
			position = new Position(startPosition.X, startPosition.Y);
			//position.X = startPosition.X;
			//position.Y = startPosition.Y;
			velosity = vel;
			state = lgt;
			dirrection = startDirrection;
		}

		//Возвращает состояние в формате, необходимом для отрисовки на клиенте
		public string GetCarStateString()
		{
			if (state != null && dirrection != null)
			{
				return string.Format("{0}_{1}", this.state, this.dirrection);
			}
			else
			{
				return "idle_east";
			}

		}

		public void SetCarState(Position pos, string st, string dir/*, int vel*/)
		{
			this.position.X = pos.X;
			this.position.Y = pos.Y;
			this.state = st;
			//velosity = vel;
			this.dirrection = dir;
		}

		public CarState GetCarState()
		{
			return new CarState(this.position, this.state, this.velosity, this.dirrection);
		}

	}
}