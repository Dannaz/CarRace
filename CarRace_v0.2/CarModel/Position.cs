using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarModel
{
    public class Position
    {
        public int X { get; set; }
        public int Y { get; set; }

        public Position(int x, int y)
        {
            this.X = x;
            this.Y = y;
        }
        public Position()
        {
            this.X = 0;
            this.Y = 0;
        }

    }
}