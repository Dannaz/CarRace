using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarModel
{
	public class BlueCar : CarFactory
	{
		List<Position> path;
		int currentStepOnRoad = 0;


		public BlueCar(Map m)
		{
			startPosition = m.startPositions.ElementAt(2);
			currentPosition = path.ElementAt(currentStepOnRoad);
			cState = new CarState(currentPosition, "idle", 0, "east");
			finished = false;
		}

		public override void goForOneStep(object input)
		{
			//Метод вызываемый основной системой, здесь должны произойти основные действия в рамках одного такта
		}



	}

}
