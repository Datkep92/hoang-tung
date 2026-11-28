# Trạng thái dự án

- Mục tiêu hiện tại: nút đặt xe qua Telegram trên trang chủ, gửi nội dung đơn kèm IP/vị trí theo IP, mỗi đơn dùng một chủ đề (forum topic).
- Nguồn: `Datkep92/hoang-tung`, nhánh `main`, xuất phát từ commit `d794512`.
- Cấu hình bot và nhóm nằm ở dòng cấu hình đầu của `index.html`. Token mới đã được điền và Telegram xác nhận hợp lệ. Repo công khai nên ai xem trang cũng đọc được token; đây là rủi ro đã được Sếp chấp nhận.
- Nhóm nhận: `Xe Hà Tùng` (`-1005834025079`), đã bật forum topic. Bot đã được cấp quyền tạo chủ đề.
- Kiểm tra: `node tests/booking-channel.test.cjs`, `node tests/booking-telegram.test.cjs`, `node tests/language-restore.test.cjs`.
- Đã kiểm chứng trên Telegram thật: 10 đơn mẫu, mỗi đơn một chủ đề (`TEST 01/10` đến `TEST 10/10`), nội dung có IP/vị trí, tất cả chủ đề đã đóng. Chưa thử bấm nút trên giao diện web; các test mã nguồn đều đạt.
- Giao diện: đã gỡ ô đồng ý, nút Telegram đổi thành `Gửi ngay`, đặt trước hai nút Zalo/WhatsApp trong dãy chọn kênh. Test cấu trúc và logic đạt; chưa xem trực quan trên màn hình vì Apelin đang chiếm màn hình.
