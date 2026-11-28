# Trạng thái dự án

- Mục tiêu hiện tại: nút đặt xe qua Telegram trên trang chủ, gửi nội dung đơn kèm IP/vị trí theo IP, mỗi đơn dùng một chủ đề (forum topic).
- Nguồn: `Datkep92/hoang-tung`, nhánh `main`, xuất phát từ commit `d794512`.
- Cấu hình bot và nhóm nằm ở dòng cấu hình đầu của `index.html`. Token hiện do Telegram trả lỗi 401 nên đã để trống, chờ token mới từ Sếp; repo công khai nên không lưu token vào đây.
- Nhóm nhận: `Xe Hà Tùng` (`-1005834025079`), đã bật forum topic.
- Kiểm tra: `node tests/booking-channel.test.cjs`, `node tests/booking-telegram.test.cjs`.
- Chưa kiểm chứng: gửi đơn thật lên nhóm Telegram và thao tác trên giao diện trình duyệt.
