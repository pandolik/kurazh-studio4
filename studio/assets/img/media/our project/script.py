import cv2

def enhance_image(input_image_path, output_image_path):
    # Загрузка изображения
    image = cv2.imread(input_image_path)

    # Преобразование изображения в градации серого
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Улучшение качества изображения с помощью алгоритма улучшения
    enhanced_image = cv2.equalizeHist(gray_image)

    # Сохранение улучшенного изображения
    cv2.imwrite(output_image_path, enhanced_image)

# Пример использования
input_image_path = 'input_image.jpg'
output_image_path = 'enhanced_image.jpg'
enhance_image(input_image_path, output_image_path)
