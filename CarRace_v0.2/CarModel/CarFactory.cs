using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarModel
{
	// Класс родитель, для всех остальных автомобилей
	public abstract class CarFactory
	{
		//Отражает достиг ли текущий автомобиль финиша, обязательный параметр
		public bool finished;
		//Номер текущего автомобиля, обязательный параметр
		public int number;
		//Позиции автомобиля на текущем, и следующих двух шагах, необязательны, зависит от алгоритма
		public Position currentPosition, nextStepPosition, inTwoStepPosition;
		//Текущее состояние, обязательный параметр
		public CarState cState = null;
		//Список с позициями всех автомобилей, обязательный параметр
		public List<CarState> allCS = new List<CarState>();
		//Стартовая позиция автомобиля
		public Position startPosition;

		//Метод для обработки одного такта движения, должен изменить сState
		public abstract void goForOneStep(object input);

	}

}