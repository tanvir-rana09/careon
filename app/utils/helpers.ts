/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const numberToWords = (num: number): string => {
  const units = [
    "",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
  ];
  const tens = [
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FORTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY",
  ];

  const convertLessThanOneThousand = (num: number): string => {
    if (num === 0) {
      return "";
    }

    if (num < 20) {
      return units[num];
    }

    const ten = Math.floor(num / 10) % 10;
    const unit = num % 10;

    return ten > 0
      ? tens[ten] + (unit > 0 ? "-" + units[unit] : "")
      : units[unit];
  };

  if (num === 0) {
    return "ZERO TAKA ONLY";
  }

  let words = "";

  if (Math.floor(num / 10000000) > 0) {
    words += convertLessThanOneThousand(Math.floor(num / 10000000)) + " CRORE ";
    num %= 10000000;
  }

  if (Math.floor(num / 100000) > 0) {
    words += convertLessThanOneThousand(Math.floor(num / 100000)) + " LAC ";
    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    words += convertLessThanOneThousand(Math.floor(num / 1000)) + " THOUSAND ";
    num %= 1000;
  }

  if (Math.floor(num / 100) > 0) {
    words += convertLessThanOneThousand(Math.floor(num / 100)) + " HUNDRED ";
    num %= 100;
  }

  if (num > 0) {
    words += convertLessThanOneThousand(num);
  }

  return words.trim() + " TAKA ONLY";
};

export const validateError = (data: { [key: string]: string | string[] }) => {
  const validate: { [key: string]: string | any } = {};
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      validate[key] = data[key][0];
    } else {
      validate[key] = data[key];
    }
  });
  return validate;
};

export const isError = (value: string | any) => {
  return value ? true : false;
};

export const selectGenerator = (
  options: { [key: string]: string | any }[] = [],
  labelKey = "title",
  valueKey = "value",
  extraKey = ""
) => {
  if (!options.length) {
    return [];
  }
  return options.map((item) => {
    return {
      label: item[labelKey] + (extraKey ? ` (${item[extraKey]})` : ""),
      value: item[valueKey].toString(),
      obj: item,
    };
  });
};

export const treeGenerator = (
  options: { [key: string]: string | any }[] = [],
  labelKey = "title",
  valueKey = "value",
  childrenKey = "children"
) => {
  if (!options.length) {
    return [];
  }

  function childrenGen(items: any) {
    if (!items.length) {
      return [];
    }
    return items.map((item: any) => ({
      label: item[labelKey],
      value: item[valueKey].toString(),
      children: childrenGen(item[childrenKey]),
    }));
  }

  return childrenGen(options);
};

export const promptMessage = (
  cb = () => {},
  alert: boolean = true,
  title: string = "Are you sure?",
  text: string = "Do you want to continue?",
  icon: SweetAlertIcon = "question",
  btnText: string = "Yes, Delete it"
) => {
  if (alert) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: btnText,
      showCancelButton: true,
      focusCancel: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        cb();
      }
      return false;
    });
  } else {
    cb();
  }
};

export const alertMessage = (payload: SweetAlertOptions) => {
  Swal.fire(payload);
};

export const statusMapper = (value: string | any) => {
  const successContent = ["active", "paid"];
  const errorContent = ["inactive", "unpaid"];

  return {
    content: value ?? "N/A",
    color: successContent.includes(value)
      ? "success"
      : errorContent.includes(value)
      ? "error"
      : "default",
  };
};

export const generateUniqueNumber = (length: number = 8) => {
  // return String(new Date().getTime()).slice(-5, -1);
  return Math.floor(Math.random() * 99999999);
  // let s = "";
  // Array.from({ length }).some(() => {
  //   s += Math.random().toString(36).slice(2);
  //   return s.length >= length;
  // });
  // return s.slice(0, length).toUpperCase();
};
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "An error occurred";
}
