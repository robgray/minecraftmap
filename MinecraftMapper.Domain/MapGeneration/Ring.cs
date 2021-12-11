using System.Collections.Generic;

namespace MinecraftMapper.Domain.MapGeneration
{
	/// <summary>
	/// Rings are "layers" of maps outward from the center.
	/// The first map is ring 0.
	/// the second ring of maps are one out from the first in any direction, and are the next 8 maps.
	/// ... and so on.
	/// </summary>
    public class Ring
{
	public Ring(int ringNumber)
	{
		Number = ringNumber;
	}
	
	public int Number;
	
	public int Size => GetSize(Number);
	public int StartNumber => Ring.GetStartNumber(this.Number);
	public int EndNumber => Ring.GetEndNumber(this.Number);
	public int ThreeQuarterNumber => EndNumber - (Size / 4);
	public int HalfNumber => EndNumber - (Size / 2);
	public int QuarterNumber => EndNumber - (Size * 3 / 4);
	
	public static int GetSize(int ring) 
	{
		if (ring == 0)
			return 1;
			
		if (ring == 1)
			return 8;
			
		return GetSize(ring - 1) + 8; 
	}
	
	public Square[] GetAllSquares() 
	{
		var squares = new List<Square>();

		if (StartNumber == EndNumber)
		{
			var coords = GetCoordinatesForSquareNumber(1);
			squares.Add(new Square(coords.X, coords.Y));
		}
		else
		{
			for (var i = StartNumber; i <= EndNumber; i++)
			{
				var coords = GetCoordinatesForSquareNumber(i);
				squares.Add(new Square(coords.X, coords.Y));
			}
		}
		
		return squares.ToArray();
	}
	
	public (int X, int Y) StartCoordinates => Number == 0 ? (0,0) : (-(Number - 1), Number);
	
	public (int X, int Y) GetCoordinatesForSquareNumber(int squareNumber)
	{
		// Numbering is always clockwise, so we can do an inefficient check here
		// If we're going more X we can check the current to see if it's the same 
		// ring.  If not we need to start subtracting Y
		// If going down makes it a new ring, then we need to start substracting X
		// finally adding Y.
		
		var coords = StartCoordinates; 	// Always anti-clockwise from PositiveY but on same Y axis.
		if (squareNumber == this.StartNumber)
		{
			return coords;
		}
		
		if (squareNumber <= PositiveYValue)
		{
			return (0 - (PositiveYValue - squareNumber), Number);
		}
		
		if (squareNumber <= PositiveXValue)
		{
			if (squareNumber <= QuarterNumber)
			{
				return (Number - (QuarterNumber - squareNumber), Number);
			} else {
				return (Number, Number - (squareNumber - QuarterNumber));
			}
		}
		
		if (squareNumber <= NegativeYValue)
		{
			if (squareNumber <= HalfNumber)
			{
				return (Number, -Number - (squareNumber - HalfNumber));
			} 
			else 
			{
				return ((NegativeYValue - squareNumber), -Number);
			}
		} 
		
		if (squareNumber <= NegativeXValue)
		{
			if (squareNumber == NegativeXValue)
				return (-Number, 0);
			
			if (squareNumber <= ThreeQuarterNumber)
			{
				return (-Number - (squareNumber - ThreeQuarterNumber), -Number);
			} 
			else 
			{
				return (-Number, -Number - (ThreeQuarterNumber - squareNumber));
			}
		} 
		else 
		{
			return (-Number, Number - (EndNumber - squareNumber));
		}
	}
	
	public static int GetStartNumber(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
			
		if (ringNumber == 1)
			return 2;
			
		return (8 * (ringNumber - 1)) + GetStartNumber(ringNumber - 1);
	}
	
	public static Ring GetRingForSquareNumber(int number)
	{
		if (number == 1)
			return new Ring(0);
		
		var ringNumber = 0;
		while (GetEndNumber(ringNumber) < number)
		{
			ringNumber++;
		}
		
		return new Ring(ringNumber);
	}
	
	/// <summary>Get the square number at the end of this ring</summary>
	public static int GetEndNumber(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
		
		return GetStartNumber(ringNumber + 1) - 1;
	}
	
	public int PositiveXValue => GetPositiveX(Number);
	public int PositiveYValue => GetPositiveY(Number);
	public int NegativeXValue => GetNegativeX(Number);
	public int NegativeYValue => GetNegativeY(Number);
	
	private int GetNegativeX(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
				
		return GetNegativeXJump(ringNumber) + GetNegativeX(ringNumber - 1);
	}
	
	private int GetNegativeY(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
		
		return GetNegativeYJump(ringNumber) + GetNegativeY(ringNumber - 1);
	}
	
	private int GetPositiveY(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;

		return GetPositiveYJump(ringNumber) + GetPositiveY(ringNumber - 1);
	}
	
	private int GetPositiveX(int ringNumber)
	{
		if (ringNumber == 0)
			return 1;
		
		return  GetPositiveXJump(ringNumber) +  GetPositiveX(ringNumber - 1);
	}
	
	private int GetPositiveXJump(int ringNumber)
	{		
		if (ringNumber == 1)
			return 3;
		
		return 8 + GetPositiveXJump(ringNumber - 1);
	}
	
	private int GetPositiveYJump(int ringNumber)
	{	
		if (ringNumber == 1)
			return 1;
		
		return 8 + GetPositiveYJump(ringNumber - 1);
	}
	
	private int GetNegativeXJump(int ringNumber)
	{	
		if (ringNumber == 1)
			return 7;
			
		return 8 + GetNegativeXJump(ringNumber - 1);
	}
	
	private int GetNegativeYJump(int ringNumber)
	{	
		if (ringNumber == 1)
			return 5;
			
		return 8 + GetNegativeYJump(ringNumber - 1);
	}
}
}