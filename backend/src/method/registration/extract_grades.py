import sys
from PIL import Image
import pytesseract
import re
import os
import json

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_grades(image_path):
    # Open the image
    img = Image.open(image_path)

    # Use pytesseract to do OCR on the image
    text = pytesseract.image_to_string(img)

    # Split the text into lines
    lines = text.split('\n')

    grades = {}
    spi = None
    cgpa = None
    semester = None

    # Iterate over lines to find subjects and grades
    for line in lines:
        if re.match(r'^\d{7}', line):
            parts = line.split()
            if parts:
                subject_code = parts[0]
                # Clean subject code by removing any non-alphanumeric characters
                cleaned_subject_code = re.sub(r'[^a-zA-Z0-9]', '', subject_code)
                subject_grade = parts[-1].strip(' |')
                grades[cleaned_subject_code] = subject_grade

        # Extract SPI and CGPA
        if "SPI" in line:
            spi_match = re.search(r'SPI\s*:\s*(\d+\.\d+)', line)
            if spi_match:
                spi = spi_match.group(1)
        
        if "CGPA" in line:
            cgpa_match = re.search(r'CGPA\s*:\s*(\d+\.\d+)', line)
            if cgpa_match:
                cgpa = cgpa_match.group(1)

        # Extract semester
        if "BE SEM" in line:
            sem_match = re.search(r'BE SEM (\d+)', line)
            if sem_match:
                semester = sem_match.group(1)

    result = {"grades": grades, "spi": spi, "cgpa": cgpa, "semester": semester}

    return result

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(json.dumps({"error": "No image file path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]

    if not os.path.exists(image_path):
        print(json.dumps({"error": "Image file does not exist"}))
        sys.exit(1)

    extracted_grades = extract_grades(image_path)
    print(json.dumps(extracted_grades))
