using System;
using Newtonsoft.Json;

namespace MinecraftMapper.MapGeneration
{
    public class Square
	{
		public const int SideLength = 2048;
		public const int OffsetX = 2032;
		public const int OffsetY = -68;
		private static MapCoordinate TopLeftOffset = new MapCoordinate(OffsetX, OffsetY);
		private MapBoundingBox _boundingBox;
		
		public Square(int x, int y)
		{
			this.x = x;
			this.y = y;
			
			// Going up the Y axis ("North") gets more negative in Minecraft. So we ADD to ge the lower coordinate.
			// This means when we calculate the top offset we need to more and more negative.
			int topLeftX = TopLeftOffset.X + (SideLength * x);
			int topLeftY = TopLeftOffset.Y - (SideLength * y);
			_boundingBox = new MapBoundingBox(topLeftX, topLeftY, topLeftX + SideLength - 1, topLeftY + SideLength - 1);
		}
		
		public bool Contains(MapCoordinate coordinate) => _boundingBox.ContainsCoordinate(coordinate);
		
		public static Square CreateFromNumber(int number)
		{
			var ring = Ring.GetRingForSquareNumber(number);
			var coords = ring.GetCoordinatesForSquareNumber(number);
			
			return new Square(coords.X, coords.Y);
		}

		public static Square CreateFromCoordinate(MapCoordinate coordinate) => GetSquareEfficient(coordinate);

		private static Square GetSquareEfficient(MapCoordinate coordinate)
		{
			// Remember this coordinate system Y gets more positive as it goes "down" the axis.
			//				  ^
			//                |
			//               (-y)
			//                |
			//                |
			//<-----(-x)-----0,0-------(+x)------->
			//                |
			//                |
			//              (+y)
			//                |
			//                |
			
			var adjustedX = (coordinate.X - TopLeftOffset.X);
			var adjustedY = coordinate.Y - TopLeftOffset.Y;
			
			var x = (adjustedX / SideLength);
			var y = -(adjustedY / SideLength);
			
			x = x - (adjustedX < 0 ? 1 : 0);
			y = y + (adjustedY < 0 ? 1 : 0);
			
			return new Square(x, y);
		}

		private static Square GetSquareInefficient(MapCoordinate coordinate)
		{
			var ringNumber = 0;
			var safetyCheck = 100;			// prevent searching forever.  100 rings is a big space!
			while (ringNumber <= safetyCheck)
			{
				var ring = new Ring(ringNumber);
				var squares = ring.GetAllSquares();
				foreach(var square in squares)
				{
					if (square.Contains(coordinate))
					{
						return new Square(square.x, square.y);
					}
				}
				ringNumber++;
			}
			
			throw new ArgumentOutOfRangeException($"Could not find square inside {safetyCheck} rings.  " + 
				"May need to expand rings or more likely there is an error in the algorithm.");
		}

		private int x;
		private int y;
		
		public Ring Ring => new Ring(Math.Max(Math.Abs(x), Math.Abs(y)));
		
		public void MoveUp() {
			y++;
		}
		
		public void MoveLeft() {
			x--;
		}
		
		public void MoveRight() {
			x++;
		}
		
		public void MoveDown() {
			y--;
		}
		
		public int Number 
		{
			get 
			{
				if (Ring.Number == 0)
					return 1;

				// Top Line.
				if (y == Ring.Number)
				{
					if (x == -Ring.Number)
					{
						return Ring.EndNumber;
					}

					return x >= 0 ? Ring.PositiveYValue + x : Ring.PositiveYValue - x;
				}
				
				// Bottom Line
				if (y == -Ring.Number)
				{
					return Ring.NegativeYValue - x;
				}
				
				// Down the right hand side
				if (x == Ring.Number)
				{
					return Ring.PositiveXValue - y;
				}
				
				// Down the left hand side
				return Ring.NegativeXValue + y;
			}
		}

		public MapBoundingBox BoundingBox => _boundingBox;

		public override string ToString() => $"({x},{y})";
	}
}