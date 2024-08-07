import re
import logging
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import json

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.convert('L')  # Convert to grayscale
    img = img.filter(ImageFilter.SHARPEN)  # Sharpen image
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2)  # Enhance contrast
    return img

def extract_grades(image_path):
    img = preprocess_image(image_path)
    text = pytesseract.image_to_string(img)
    lines = text.split('\n')

    grades = {}
    spi = None
    cgpa = None
    semester = None

    # Updated regex pattern to extract subject code and final grade
    subject_pattern = re.compile(r'(\d{7})\s+.*?\s+([A-Z]{2})\s*$')

    for line in lines:
        if re.match(r'^\d{7}', line):
            parts = line.split()
            if parts:
                subject_code = parts[0]
                # Clean subject code by removing any non-alphanumeric characters
                cleaned_subject_code = re.sub(r'[^a-zA-Z0-9]', '', subject_code)
                subject_grade = parts[-1].strip(' |')
                grades[cleaned_subject_code] = subject_grade

        # Extract SPI
        if "SPI:" in line or "SPI :" in line:
            spi_match = re.search(r'SPI\s*:\s*(\d+\.\d+)', line)
            if spi_match:
                spi = spi_match.group(1)
                logger.debug(f"SPI found: {spi}")
        
        # Extract CGPA
        if "CGPA:" in line or "CGPA :" in line:
            cgpa_match = re.search(r'CGPA\s*:\s*(\d+\.\d+)', line)
            if cgpa_match:
                cgpa = cgpa_match.group(1)
                logger.debug(f"CGPA found: {cgpa}")

        # Extract semester
        if "BE SEM" in line:
            sem_match = re.search(r'BE SEM (\d+)', line)
            if sem_match:
                semester = sem_match.group(1)
                logger.debug(f"Semester found: {semester}")

    result = {"grades": grades, "spi": spi, "cgpa": cgpa, "semester": semester}
    logger.debug(f"Extracted result: {result}")
    return result

if __name__ == '__main__':
    import sys
    image_paths = sys.argv[1:]
    
    if not image_paths:
        print(json.dumps({"error": "No image paths provided"}))
        sys.exit(1)
    
    results = []

    for image_path in image_paths:
        extracted_grades = extract_grades(image_path)
        results.append(extracted_grades)

    final_result = {"semesters": results}
    print(json.dumps(final_result))
