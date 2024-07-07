import { ApiHideProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUSerDto {
  /**
   *Debe ser un string de entre 3 y 80 caracteres
   *@example 'Test User01'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   *Debe ser un string con formato email
   *@example 'User01@mail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   *Debe contener entre 8-15 caracteres, e incluir al menos una minuscula, un numero, y al menos uno de los caracteres especiales (!@#$%^&*)
   *@example 'Example123*'
   */
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña debe tener como máximo 15 caracteres',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe contener al menos una letra minúscula',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe contener al menos una letra mayúscula',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'La contraseña debe contener al menos un número',
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;

  /**
   *Debe coincidir con el password
   *@example 'Example123*'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   *Debe ser un string entre 3-80 caracteres
   *@example 'example street 45 south'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   *Debe ser un numero
   *@example '123456789'
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   *Debe ser un string entre 4-20 caracteres
   *@example 'Test Country'
   */
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  country: string;

  /**
   *Debe ser un string entre 5-20 caracteres
   *@example 'Test City'
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}
// export class UpdateuserDto {
//   @IsOptional()
//   @IsString()
//   @MinLength(3)
//   @MaxLength(80)
//   name: string;
// }

export class LoginUserDto extends PickType(CreateUSerDto, [
  'email',
  'password',
]) {}
