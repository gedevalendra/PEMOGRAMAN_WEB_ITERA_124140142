import math_operations
from math_operations import celsius_ke_fahrenheit, celsius_ke_kelvin

print("=" * 45)
print(f"{'PENGUJIAN MODUL GEOMETRI':^45}")
print("=" * 45)

print(f"Nilai Konstanta PI : {math_operations.PI}")
print("-" * 45)

s = 5.0
l_persegi = math_operations.luas_persegi(s)
k_persegi = math_operations.keliling_persegi(s)
print(f"PERSEGI (Sisi = {s})")
print(f"- Luas     : {l_persegi:.2f}")
print(f"- Keliling : {k_persegi:.2f}")

p, le = 8.0, 4.0
l_pp = math_operations.luas_persegi_panjang(p, le)
k_pp = math_operations.keliling_persegi_panjang(p, le)
print(f"PERSEGI PANJANG (P = {p}, L = {le})")
print(f"- Luas     : {l_pp:.2f}")
print(f"- Keliling : {k_pp:.2f}")

r = 7.0
l_lingkaran = math_operations.luas_lingkaran(r)
k_lingkaran = math_operations.keliling_lingkaran(r)
print(f"LINGKARAN (Jari-jari = {r})")
print(f"- Luas     : {l_lingkaran:.2f}")
print(f"- Keliling : {k_lingkaran:.2f}")

print("\n" + "=" * 45)
print(f"{'PENGUJIAN KONVERSI SUHU':^45}")
print("=" * 45)

suhu_celsius = 35.0
print(f"Suhu Awal : {suhu_celsius:.2f} °Celsius")
print("-" * 45)

suhu_fahrenheit = celsius_ke_fahrenheit(suhu_celsius)
suhu_kelvin = celsius_ke_kelvin(suhu_celsius)

print(f"Hasil Konversi:")
print(f"- Ke Fahrenheit : {suhu_fahrenheit:.2f} °F")
print(f"- Ke Kelvin     : {suhu_kelvin:.2f} K")
print("=" * 45)
