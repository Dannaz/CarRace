using System;
using System.IO;
using System.Collections.Generic;
using CarModel;

namespace CarRace_v0._2
{
	public class ReadMapFromFile
	{
		public int[,] map;
		public Position finish;
		public List<Position> allStarts = new List<Position>();
		public List<CarFactory> cars;

		/// <summary>
		/// Считывает карту из файла
		/// </summary>
		/// <param name="filePath">имя файла с картой</param>
		public ReadMapFromFile(string filePath)
		{

			filePath = AppDomain.CurrentDomain.BaseDirectory.ToString() + "map\\" + filePath;
			string[] text = File.ReadAllLines(filePath);
			int len2 = text[0].Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Length;
			map = new int[text.Length, len2];

			for (int i = 0; i < map.GetLength(0); i++)
			{
				string[] oneStr = text[i].Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
				for (int j = 0; j < map.GetLength(1); j++)
				{
					map[i, j] = Convert.ToInt32(oneStr[j]);

					//чтобы старт и финиш не были забиты вручную, считываем их координаты с карты.
					if (map[i, j] == 2)
					{
						finish = new Position(j, i);
					}
					if (map[i, j] == 3)
					{
						map[i, j] = 1;
						allStarts.Add(new Position(j, i));
					}

				}
			}

		}

	}
}