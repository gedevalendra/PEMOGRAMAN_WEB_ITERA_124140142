print("-=======Penghitung BMI-=======")

bb = float(input("Masukkan Berat Badan Anda  : "))
tb = float(input("Masukkan Tinggi Badan Anda : "))

newTb = tb/100
BMI = bb / (newTb * newTb)

print("BMI Anda adalah : ", f"{BMI:.2f}")

if BMI < 18.5:
    print("Berat Badan Kurang")

elif 18.5 <= BMI < 25:
    print("Berat Badan Normal")

elif 25 <= BMI < 30:
    print("Berat Badan Berlebih")

else:
    print("Obesitas")
