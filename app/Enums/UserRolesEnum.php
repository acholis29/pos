<?php

namespace App\Enums;

enum UserRolesEnum: int
{
    case Customer = 2;
    case Employee = 1;
    case Admin = 99;
}
