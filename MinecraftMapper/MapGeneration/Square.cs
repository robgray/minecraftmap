using System;

namespace MinecraftMapper.MapGeneration
{
    public class Square
{
	private const int SideLength = 2048;
	private static MapCoordinate TopLeftOffset = new MapCoordinate(2048, -25);
	private MapBoundingBox _boundingBox;
	
	public Square(int x, int y)
	{
		this.x = x;
		this.y = y;
		
		// Going up the Y axis ("North") gets more negative in Minecraft. So we ADD to ge the lower coordinate.
		// This means when we calculate the top offset we need to more and more negative.
		int topLeftX = TopLeftOffset.X + (SideLength * x);
		int topLeftY = TopLeftOffset.Y - (SideLength * y);
		_boundingBox = new MapBoundingBox(topLeftX, topLeftY, topLeftX + SideLength, topLeftY + SideLength);
	}
	
	public bool Contains(MapCoordinate coordinate) => _boundingBox.ContainsCoordinate(coordinate);
	
	public static Square CreateFromNumber(int number)
	{
		var ring = Ring.GetRingForSquareNumber(number);
		var coords = ring.GetCoordinatesForSquareNumber(number);
		
		return new Square(coords.X, coords.Y);
	}
	
	public static Square CreateFromCoordinate(MapCoordinate coordinate)
	{
		// Remember this coordinate system Y gets more positive as it goes "down" the axis.
		//				  ^
		//				  |
		//			    (-y)
		//				  |
		//				  |
		//<-----(-x)-----0,0-------(+x)------->
		//				  |
		//				  |
		//			    (+y)
		//			   	  |
		//				  |
						
						
		//int adjustedX = (coordinate.X - TopLeftOffset.X);
		//int adjustedY = coordinate.Y < 0 ? (coordinate.Y + Math.Abs(TopLeftOffset.Y)) : (coordinate.Y + TopLeftOffset.Y);
		//
		//int x = (int)(adjustedX / SideLength);
		//int y = -(int)(adjustedY / SideLength);
		//
		//x = x - (adjustedX < 0 ? 1 : 0);
		//y = y + (adjustedY > -SideLength ? 1 : 0);
		
		// New cheaty way.  
		// Get all sqaures for each ring and test if coords are in that square.  keep going until square is found. 
		// TODD: fix. **ineffecicient**
		
		var ringNumber = 0;
		var safetyCheck = 20;			// prevent searching forever.  20 rings is a big space!
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

			if (Math.Abs(y) == Ring.Number) {
				return (y >= 0 ? Ring.PositiveYValue + x : Ring.NegativeYValue -x);
			}
			 
			// If y doesn't equal ring number, X must, or it'd be a different ring.
			return (x >= 0 ? Ring.PositiveXValue - y : Ring.NegativeXValue + y);
		}
	}

	public override string ToString() => $"({x},{y})";
}
}