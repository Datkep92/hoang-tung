# Trạng thái dự án

- Mục tiêu hiện tại: nút đặt xe qua Telegram trên trang chủ, gửi nội dung đơn kèm IP/vị trí theo IP, mỗi đơn dùng một chủ đề (forum topic).
- Nguồn: `Datkep92/hoang-tung`, nhánh `main`, xuất phát từ commit `d794512`.
- Cấu hình bot và nhóm nằm ở dòng cấu hình đầu của `index.html`. Token mới đã được điền và Telegram xác nhận hợp lệ. Repo công khai nên ai xem trang cũng đọc được token; đây là rủi ro đã được Sếp chấp nhận.
- Nhóm nhận: `Xe Hà Tùng` (`-1005834025079`), đã bật forum topic. Bot là quản trị viên nhưng chưa có quyền tạo chủ đề; Telegram trả lỗi khi thử tạo. Cần bật quyền “Quản lý chủ đề” cho bot trong nhóm.
- Kiểm tra: `node tests/booking-channel.test.cjs`, `node tests/booking-telegram.test.cjs`.
- Chưa kiểm chứng: gửi đơn thật lên nhóm Telegram và thao tác trên giao diện trình duyệt.
