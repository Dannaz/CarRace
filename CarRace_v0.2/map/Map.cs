using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarModel
{
	public class Map
	{
		//Карта, считывается из файла
		public int[,] map;
		//Позиции автомобилей
		public List<Position> carsPos;
		//Стартовые позиции
		public List<Position> startPositions;
		//Финишная позиция
		public Position finishPosition;

		public Map(int[,] mapArray, List<Position> allStarts, Position finish)
		{
			map = mapArray;
			startPositions = allStarts;
			finishPosition = finish;
		}

		public void ResetPositions()
		{
			carsPos.Clear();
		}
	}

}