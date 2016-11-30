using System;
using System.Diagnostics;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using CarModel;

namespace CarRace_v0._2
{
	public class RaceHub : Hub
	{

		public void send(string name, string message)
		{
			Clients.All.broadcastMessage(name, message);
			//Clients.All.logData("name:" + name);
		}


		public void startRace(string pathToMap)
		{
			ReadMapFromFile rSystem = new ReadMapFromFile(pathToMap);
			Map m = new Map(rSystem.map, rSystem.allStarts, rSystem.finish);
			serverCallDrawMap(rSystem.map);

			//blueCar 
			CarFactory blueCar = new BlueCar(m);

			//greenCar 
			CarFactory greenCar = new GreenCar(m);

			//redCar
			CarFactory redCar = new RedCar(m);

			//Добавление всех автомобилей в списки
			List<CarFactory> cars = new List<CarFactory>();
			cars.Add(blueCar);
			cars.Add(greenCar);
			cars.Add(redCar);

			createCars(cars);

			Thread[] _carThread = new Thread[3];
			//Пока все автомобиле не достигнут финиша
			while (!blueCar.finished && !greenCar.finished && !redCar.finished)
			{
				//Создаем список текущих позиций всех машин
				List<CarState> allCS = new List<CarState>();
				foreach (CarFactory car in cars)
				{
					allCS.Add(car.cState);
				}

				foreach (CarFactory car in cars)
				{
					//Инициализируем в классе каждой машины поле со списком текущих позиций всех машин.
					car.allCS = allCS;
					int i = 0;
					_carThread[i] = new Thread(new ParameterizedThreadStart(car.goForOneStep));
					_carThread[i].Start(m);
					i++;
				}

				foreach (CarFactory car in cars)
				{
					drawCar(car, m.map);
				}

				Thread.Sleep(500);
			}
		}

		/// <summary>
		/// Отрисовывает карту на клиенте
		/// </summary>
		/// <param name="map">Карта</param>
		public void serverCallDrawMap(int[,] map)
		{
			Clients.All.clientCallDrawMap(map);
		}

		/// <summary>
		/// Создает автомобиле на стороне клиента и отрисовывает их в стартовых точках
		/// </summary>
		/// <param name="cars">Список со всеми автомобилями</param>
		public void createCars(List<CarFactory> cars)
		{
			int n = 1;
			foreach (var car in cars)
			{
				car.number = n;
				n++;
				Clients.All.clientCallCreateCar(car.number, car.startPosition.X, car.startPosition.Y);
			}
		}

		/// <summary>
		/// Рисует автомобиль
		/// </summary>
		/// <param name="car">Объект автомобиля</param>
		/// <param name="map">Карта</param>
		public void drawCar(CarFactory car, int[,] map)
		{
			//Thread.Sleep(500);
			Clients.All.clientCallDrawCar(car.number, car.currentPosition.X, car.currentPosition.Y, car.cState.GetCarStateString());
		}

	}
}