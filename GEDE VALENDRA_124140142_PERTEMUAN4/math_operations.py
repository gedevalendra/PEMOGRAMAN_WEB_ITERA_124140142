
PI = 3.14

# --- PERSEGI ---
def luas_persegi(sisi):
    return sisi * sisi

def keliling_persegi(sisi):
    return 4 * sisi

# --- PERSEGI PANJANG ---
def luas_persegi_panjang(panjang, lebar):
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    return 2 * (panjang + lebar)

# --- LINGKARAN ---
def luas_lingkaran(jari_jari):
    return PI * (jari_jari ** 2)

def keliling_lingkaran(jari_jari):
    return 2 * PI * jari_jari

# Konversi Suhu
def celsius_ke_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def celsius_ke_kelvin(celsius):
    return celsius + 273.15
