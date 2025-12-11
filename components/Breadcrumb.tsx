import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BreadcrumbItem {
  label: {
    en: string;
    zh: string;
  };
  path?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();
  const { t } = useApp();

  const handleClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === items.length - 1 ? (
            // Last item - current page (not clickable)
            <span className="text-text dark:text-white font-medium">
              {t(item.label)}
            </span>
          ) : (
            // Clickable items
            <>
              <button
                onClick={() => handleClick(item)}
                className="hover:text-text dark:hover:text-white transition-colors"
              >
                {t(item.label)}
              </button>
              <ChevronRight size={16} className="opacity-50" />
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
