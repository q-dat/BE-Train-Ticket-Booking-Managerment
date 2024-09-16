import app from './app';

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => console.log(`Đang chạy bon bon ùn ùn với vận tốc ${PORT}km/h`));
