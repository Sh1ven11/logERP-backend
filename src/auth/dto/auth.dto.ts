import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  
  @ApiProperty({
    example: "shiven",
    description: "Username of the user attempting to log in",
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: "mypassword123",
    description: "Raw password to authenticate the user",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
