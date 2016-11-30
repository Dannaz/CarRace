using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarModel
{

	public class GreenCar : CarFactory
	{
		public GreenCar(Map m)
		{
			startPosition = m.startPositions.ElementAt(1);
			currentPosition = startPosition;
			cState = new CarState(currentPosition, "idle", 0, "east");
			finished = false;
		}


		public override void goForOneStep(object input)
		{

		}

	}



}
