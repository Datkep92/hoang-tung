# Trạng thái dự án

- Mục tiêu hiện tại: nút đặt xe qua Telegram trên trang chủ, gửi nội dung đơn kèm IP/vị trí theo IP, mỗi đơn dùng một chủ đề (forum topic).
- Nguồn: `Datkep92/hoang-tung`, nhánh `main`, xuất phát từ commit `d794512`.
- Cấu hình bot và nhóm nằm ở dòng cấu hình đầu của `index.html`. Token mới đã được điền và Telegram xác nhận hợp lệ. Repo công khai nên ai xem trang cũng đọc được token; đây là rủi ro đã được Sếp chấp nhận.
- Nhóm nhận: `Xe Hà Tùng` (`-1005834025079`), đã bật forum topic. Bot đã được cấp quyền tạo chủ đề.
- Kiểm tra: `node tests/booking-channel.test.cjs`, `node tests/booking-telegram.test.cjs`, `node tests/language-restore.test.cjs`, `node tests/booking-datetime.test.cjs`, `node tests/dock-responsive.test.cjs`, `node tests/place-suggestions.test.cjs` (chạy bằng `node.real --jitless`).
- Đã kiểm chứng trên Telegram thật: 10 đơn mẫu, mỗi đơn một chủ đề (`TEST 01/10` đến `TEST 10/10`), nội dung có IP/vị trí, tất cả chủ đề đã đóng. Chưa thử bấm nút trên giao diện web; các test mã nguồn đều đạt.
- Giao diện: đã gỡ ô đồng ý, nút Telegram đổi thành `Gửi ngay`, đặt trước hai nút Zalo/WhatsApp trong dãy chọn kênh. Đã ẩn nút đổi chiều đi; ô điểm đi/đến cho nhập tự do, gợi ý hiện khi gõ và lọc bỏ dấu; ngày/giờ mặc định là hiện tại, nằm cùng dòng trên mobile; câu báo giá dự phòng đã ẩn; dãy nút dưới cùng chia đều, co giãn theo màn hình. Nội dung gửi không lặp lại ba nhãn Họ và tên/Số điện thoại/Loại xe nhưng vẫn giữ giá trị. Test cấu trúc và logic đạt; chưa xem trực quan trên màn hình vì Apelin đang chiếm màn hình.
